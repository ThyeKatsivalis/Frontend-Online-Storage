import React from 'react';
import Proptypes from 'prop-types';

class ReviewsSaved extends React.Component {
  render() {
    const {
      evaluationList,
    } = this.props;
    // Se houver alguma avalação salva, renderiza-as através de map.
    return (
      (evaluationList)
      && (
        <div>
          {evaluationList.map(({ email, rating, text }) => (
            <div key={ email }>
              <span data-testid="review-card-email">
                {email}
              </span>
              <span data-testid="review-card-rating">
                { rating }
              </span>
              <span data-testid="review-card-evaluation">
                { text }
              </span>
            </div>
          ))}
        </div>
      )
    );
  }
}

ReviewsSaved.propTypes = {
  evaluationList: Proptypes.array,
}.isRequired;

export default ReviewsSaved;
