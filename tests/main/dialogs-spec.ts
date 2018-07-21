import { setupDialogs } from '../../src/main/dialogs';
import { ipcMainManager } from '../../src/main/ipc';
import { IpcEvents } from '../../src/ipc-events';

import { dialog } from 'electron';

jest.mock('electron', () => require('../mocks/electron'));
jest.mock('../../src/main/windows');

describe('dialogs', () => {
  it('sets up dialogs', () => {
    setupDialogs();

    expect(ipcMainManager.eventNames()).toEqual([
      IpcEvents.SHOW_WARNING_DIALOG
    ]);
  });

  it('tries to show a dialog if triggered', () => {
    setupDialogs();

    ipcMainManager.emit(IpcEvents.SHOW_WARNING_DIALOG, {}, { hi: 'hello' });
    expect(dialog.showMessageBox).toHaveBeenCalledWith(undefined, {
      type: 'warning',
      hi: 'hello'
    });
  });
});
