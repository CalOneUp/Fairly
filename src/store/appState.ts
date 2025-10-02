export type ViewMode = 'admin' | 'rep';

export type UiState = {
  currentView: ViewMode;
  loggedInRepId: number;
  currentDate: Date;
};

const uiState: UiState = {
  currentView: 'admin',
  loggedInRepId: 101,
  currentDate: new Date('2025-10-02T13:15:00+01:00'),
};

export function getUiState(): UiState {
  return uiState;
}
