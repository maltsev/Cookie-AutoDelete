/**
 * Copyright (c) 2017-2020 Kenny Do and CAD Team (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/graphs/contributors)
 * Licensed under MIT (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/blob/3.X.X-Branch/LICENSE)
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
const styles = {
  hamburger: {
    color: 'white',
  },
  menuLink: {
    padding: '0.5em 1em',
    textAlign: 'center' as const,
    width: '100%',
  },
};

const sideBarTabs = [
  {
    tabId: 'tabWelcome',
    tabText: browser.i18n.getMessage('welcomeText'),
  },
  {
    tabId: 'tabSettings',
    tabText: browser.i18n.getMessage('settingsText'),
  },
  {
    tabId: 'tabExpressionList',
    tabText: browser.i18n.getMessage('whiteListText'),
  },
  {
    tabId: 'tabCleanupLog',
    tabText: browser.i18n.getMessage('cleanupLogText'),
  },
  {
    tabId: 'tabAbout',
    tabText: browser.i18n.getMessage('aboutText'),
  },
];

interface OwnProps {
  activeTab: string;
  switchTabs: (id: string) => void;
}

class SideBar extends React.Component<OwnProps> {
  // Switches tabs
  public toggleClass(element: HTMLElement | null, className: string) {
    if (!element) return;
    const classes = element.className.split(/\s+/);
    const length = classes.length;

    for (let i = 0; i < length; i += 1) {
      if (classes[i] === className) {
        classes.splice(i, 1);
        break;
      }
    }
    // The className is not found
    if (length === classes.length) {
      classes.push(className);
    }

    element.className = classes.join(' ');
  }

  // Toggles the sidebar
  public toggleAll() {
    const active = 'active';
    const layout = document.getElementById('layout');
    const menu = document.getElementById('menu');
    const menuLink = document.getElementById('menuLink');
    this.toggleClass(layout, active);
    this.toggleClass(menu, active);
    this.toggleClass(menuLink, active);
  }
  public render() {
    const { activeTab, switchTabs } = this.props;
    return (
      <div>
        <div
          style={styles.menuLink}
          onClick={() => this.toggleAll()}
          id="menuLink"
          className="menu-link"
        >
          <FontAwesomeIcon size={'3x'} style={styles.hamburger} icon="bars" /><br />
          <div
            style={{
              color: 'white',
              fontSize: '16px',
            }}>
              {browser.i18n.getMessage('menuText')}
          </div>
        </div>

        <div id="menu">
          <div className="pure-menu">
            <div
              className="sidebar-version"
              style={{
                  textAlign: 'center',
                  width: '100%',
              }}
            >
              <span>CAD {browser.i18n.getMessage('versionText', [''])} <b>{browser.runtime.getManifest().version}</b></span>
            </div>
            {sideBarTabs.map((element, index) => (
              <div
                key={element.tabId}
                id={`${element.tabId}`}
                onClick={() => switchTabs(element.tabId)}
                className={`pure-menu-item ${
                  activeTab === element.tabId ? 'pure-menu-selected' : ''
                }`}
              >
                <span>{`${element.tabText}`}</span>
              </div>
            ))}

            <div
              style={{
                bottom: '5px',
                position: 'absolute',
                width: '100%',
              }}
            >
              <a
                href="https://www.paypal.me/mrkennyd/5"
                className="btn"
                style={{
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                {browser.i18n.getMessage('contributeText')}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
