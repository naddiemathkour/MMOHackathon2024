import { Injectable } from '@angular/core';
import { OpenAIEnv } from '../env/environment'
import OpenAI from 'openai';
import { ChatCompletion } from "openai/resources/chat/completions.mjs";
import { ITest } from '../interfaces/test.interface'

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

  async generateTestsFromAC(criteria: string): Promise<ITest[]> {
    const resp = await this._openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            `You are an assistant to QA testers working on software development projects.
              Your goal is to convert Acceptance Criteria text into individual tests and also to generate the most important
              edge case scenarios for the features being implemented. These tests should be returned in JSON form and contain a
              "scenario" and "expected_result" field that are both strings. The returned result should be a single array of tests.`
        },
        {
          role: "user",
          content: `Given the following Acceptance Criteria (in brackets) generate all tests from the criteria and
                      up to 10 edge case scenarios in addition to the acceptance criteria tests that may be missed by 
                      the acceptance criteria instructions. The scenario should detail steps a tester must
                      take to execute the test.[${criteria}]`
        },
      ],
    });

    return this.cleanResponse(resp);
  }


  cleanResponse(resp: ChatCompletion) {
    const responseString = resp.choices[0].message.content
      ?.trim()
      .replace(/^```json\n/g, "")
      .replace(/\n```$/g, "");
    let respJSON: any;
    try {
      respJSON = JSON.parse(String(responseString));
    } catch (error) {
      return null;
    }
    return respJSON;
  };
}
