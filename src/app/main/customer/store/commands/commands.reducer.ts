import * as command from './commands.actions';
import { Command } from '../../../../services/customer/domain/command.model';

export interface State {
  commands: Command[];
}

export const initialState: State = {
  commands: [],
};

export function reducer(state = initialState, action: command.Actions): State {
  switch (action.type) {
    case command.LOAD_ALL: {
      return initialState;
    }

    case command.LOAD_ALL_COMPLETE: {
      const commands = action.payload;

      return {
        commands: commands,
      };
    }

    default: {
      return state;
    }
  }
}

export const getCommands = (state: State) => state.commands;
