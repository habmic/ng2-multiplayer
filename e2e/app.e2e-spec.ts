import { Ng2MultiplayerPage } from './app.po';

describe('ng2-multiplayer App', () => {
  let page: Ng2MultiplayerPage;

  beforeEach(() => {
    page = new Ng2MultiplayerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
