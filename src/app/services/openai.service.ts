import { Injectable } from '@angular/core';
import { OpenAIEnv } from '../env/environment'
import OpenAI from 'openai';
import { from, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private _openai!: OpenAI;

  constructor() {
    this._openai = new OpenAI({
      apiKey: OpenAIEnv.API_KEY,
      dangerouslyAllowBrowser: true,
      project: OpenAIEnv.PROJECT,
    });
  }

  tempConnTest() {
    console.log('running ai test...')
    return from(
      this._openai.chat.completions.create({
        model: "gpt-4o-mini", //Could be changed to 3.5turbo to improve performance
        messages: [
          {
            role: "system",
            content: "You are an expert in QA tester's assistant. Your goal is to take in Acceptance Criteria and return test cases",
          },
          {
            role: "user",
            content: `Implement a user input that only accepts 15 characters and doesn't allow numbers to be used. Be sure to 
            cover as real-world cases as you can (up to 10 tests)`
          },
        ],
      })
    )
  }
}
