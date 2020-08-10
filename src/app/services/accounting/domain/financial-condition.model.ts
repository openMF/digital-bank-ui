
import {FinancialConditionSection} from './financial-condition-section.model';

export interface FinancialCondition {
  date: string;
  financialConditionSections: FinancialConditionSection[];
  totalAssets: string;
  totalEquitiesAndLiabilities: string;
}
