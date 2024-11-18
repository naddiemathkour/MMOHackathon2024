export interface ITest {
  test_id: number;
  storytestplan_id: number;
  created_at: Date;
  updated_at: Date;
  tested_at: Date;
  scenario: string;
  expected_result: string;
  test_status: string;
}
