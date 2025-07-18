import { GoogleGenAI } from "@google/genai";
import * as FileSystem from "expo-file-system";
import apikey from "../components/apiKey";
const ai = new GoogleGenAI({apiKey: apikey()});

const receiptList: any[] = [];

export function getReceiptList() {
  return receiptList;
}

export async function addToReceiptList(receipt: any) {
  const base64ImageFile = await FileSystem.readAsStringAsync(receipt.uri, {
    encoding: "base64",
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile,
        },
      },
      {
        text: "I am sending a picture of a receipt and looking to compact its information into a JSON Object. Please return just a JSON Object in plain text, do not use any markdown format. It should be a list of item objects with each item as the following syntax: {name: 'Item name, renamed to sound like a simple and human readable. Remove brand name. Capitalize first letter.', price: 'item price listed, as an number', category: 'One of the categories, choose the closest one. It also belongs in a category if it includes an ingredient that belongs to that category. Only use the 'Other' category as last resort, better to make assumptions.'}. The categories are: Fruits, Vegetables, Grains, Seasonings, Legumes, Meat, Dairy, Snacks, Drinks, Other. Remove any non-food items or items you can't tell whether it's a food item. Also please combine items into one object that are the same name and add the prices together. If there is no receipt seen, return an empty list.",
      },
    ],
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    },
  });

  const responseText = response.candidates[0].content.parts[0].text;
    receipt.items = JSON.parse(responseText);
  console.log(receipt.items);
  receiptList.push(receipt);
}

export function removeFromReceiptList(index: number) {
  receiptList.splice(index, 1);
}
