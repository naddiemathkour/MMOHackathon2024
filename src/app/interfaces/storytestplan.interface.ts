import { ITestPlan } from "./testplan.interface";

export interface IStoryTestPlan {
  storytestplan_id?: number;
  created_at?: Date;
  completed_at?: Date;
  sprinttestplan_id: number;
  jira_id: string;
  story_summary?: string;
  execution_count?: number;
  test_count: number;
  passed_test_count?: number;
  test_status?: string;
  tests: ITestPlan[];
}
