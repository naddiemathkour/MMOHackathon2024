import { Injectable } from '@angular/core';
import { OpenAIEnv } from '../env/environment'
import OpenAI from 'openai';
import { from, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  constructor(private _openai: OpenAI) {
    this._openai = new OpenAI({
      apiKey: OpenAIEnv.API_KEY,
      dangerouslyAllowBrowser: true,
      project: OpenAIEnv.PROJECT,
    })
  }

  tempConnTest() {
    return from(
      this._openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert in QA testing . Your goal is to take in Acceptance Criteria and return test cases",
          },
          {
            role: "user",
            content: `Implement a user input that only accepts 15 characters and doesn't allow numbers to be used`
          },
        ],
      })
    ).pipe(
      map((resp: any) => {
        console.log(resp)
      })
    )
  }
}
