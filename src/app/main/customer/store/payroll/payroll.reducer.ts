import { PayrollConfiguration } from '../../../../services/payroll/domain/payroll-configuration.model';
import * as payrollActions from './payroll.actions';
import { PayrollDistributionRoutePayload } from './payroll.actions';

export interface State {
  distribution: PayrollConfiguration;
  loadedAt: number;
}

const initialState: State = {
  distribution: null,
  loadedAt: null,
};

export function reducer(state: State = initialState, action: payrollActions.Actions): State {
  switch (action.type) {
    case payrollActions.LOAD: {
      const distribution: PayrollConfiguration = action.payload;

      return {
        distribution,
        loadedAt: Date.now(),
      };
    }

    case payrollActions.UPDATE_SUCCESS: {
      const payload: PayrollDistributionRoutePayload = action.payload;

      return {
        distribution: payload.distribution,
        loadedAt: state.loadedAt,
      };
    }

    default: {
      return state;
    }
  }
}

export const getPayrollDistribution = (state: State) => state.distribution;
export const getPayrollDistributionLoadedAt = (state: State) => state.loadedAt;
