/**
 * Copyright (c) 2017 Kenny Do
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import * as React from 'react';
import { connect } from 'react-redux';

import { globExpressionToRegExp } from '../../../services/Libs';
import ExpressionTable from '../../common_components/ExpressionTable';

interface OwnProps {
  url: string;
  storeId: string;
}

interface ReduxState {
  expressions: Expression[];
}

const FilteredExpression: React.FunctionComponent<
  OwnProps & ReduxState
> = props => {
  const { expressions, storeId } = props;
  return (
    <ExpressionTable
      expressionColumnTitle={browser.i18n.getMessage(
        'matchedDomainExpressionText',
      )}
      expressions={expressions}
      storeId={storeId}
      emptyElement={
        <span
          style={{
            fontStyle: 'italic',
            width: '100%',
          }}
        >
          <div
            className="alert alert-primary"
            role="alert"
            style={{
              marginBottom: 0,
            }}
          >
            <i>{browser.i18n.getMessage('noRulesText')}</i>
          </div>
        </span>
      }
    />
  );
};

const getExpression = (state: State, props: OwnProps) =>
  state.lists[props.storeId] === undefined ? [] : state.lists[props.storeId];

// Filter the expression list from the current url
const getMatchedExpressions = (state: State, props: OwnProps) => {
  const expressions = getExpression(state, props);
  const url = props.url;
  return expressions.filter(expression => {
    const regExp = expression.isRegExp ? expression.expression : globExpressionToRegExp(expression.expression);
    return new RegExp(regExp).test(url);
  });
};

const mapStateToProps = (state: State, props: OwnProps) => ({
  expressions: getMatchedExpressions(state, props),
});

export default connect(mapStateToProps)(FilteredExpression);
