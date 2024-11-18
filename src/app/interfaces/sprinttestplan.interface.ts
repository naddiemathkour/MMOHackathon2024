export interface ISprintTestPlan {
  sprinttestplan_id: number;
  start_date: Date;
  completed_date: Date;
  end_date: Date;
  total_story_count: number;
  passed_story_count: number;
  sprint_title: string;
}
