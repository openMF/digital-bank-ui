import { reducer } from './tellers.reducer';
import { ResourceState } from '../../../common/store/resource.reducer';
import { ExecuteCommandPayload, ExecuteCommandSuccessAction } from './teller.actions';
import { Status } from '../../../../services/teller/domain/teller.model';

describe('Tellers Reducer', () => {
  describe('EXECUTE_COMMAND_SUCCESS', () => {
    function createState(state?: Status, assignedEmployee?: string): ResourceState {
      return {
        ids: ['testTeller'],
        entities: {
          'testTeller': {
            code: 'testTeller',
            state,
            assignedEmployee,
          },
        },
        selectedId: null,
        loadedAt: {},
      };
    }

    it('should add assigned employee on open', () => {
      const payload: ExecuteCommandPayload = {
        officeId: 'officeId',
        tellerCode: 'testTeller',
        command: {
          action: 'OPEN',
          assignedEmployeeIdentifier: 'test',
        },
        activatedRoute: null,
      };

      const initialState: ResourceState = createState();

      const expectedResult: ResourceState = createState('OPEN', payload.command.assignedEmployeeIdentifier);

      const result = reducer(initialState, new ExecuteCommandSuccessAction(payload));

      expect(result).toEqual(expectedResult);
    });

    it('should remove assigned employee on close', () => {
      const payload: ExecuteCommandPayload = {
        officeId: 'officeId',
        tellerCode: 'testTeller',
        command: {
          action: 'CLOSE',
        },
        activatedRoute: null,
      };

      const initialState: ResourceState = createState();

      const expectedResult: ResourceState = createState('CLOSED', null);

      const result = reducer(initialState, new ExecuteCommandSuccessAction(payload));

      expect(result).toEqual(expectedResult);
    });
  });
});
