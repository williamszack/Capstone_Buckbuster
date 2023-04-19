const { client } = require('./client');


async function addNewReview({
  user_id,
  product_id,
  title,
  description,
  rating,
  created_at,
}) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
        INSERT INTO reviews
        (user_id, product_id, title, description, rating, created_at)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
      [user_id, product_id, title, description, rating, created_at]
    );

    return review;
  } catch (error) {
    console.error("error with adding new review", error);
  }
}

async function getReviewsByProductId(product_id) {
  try {
    const { rows: reviews } = await client.query(
      `
        SELECT *
        FROM reviews
        WHERE product_id = $1;
        `,
      [product_id]
    );

    return reviews;
  } catch (error) {
    console.log("error with getting reviews by productId", error);
  }
}

// need to join users table to grab username to display for the frontend
async function getReviewsByUserId(user_id) {
  try {
    const { rows: reviews } = await client.query(
      `
        SELECT *
        FROM reviews
        WHERE user_id = $1;
        `,
      [user_id]
    );

    return reviews;
  } catch (error) {
    console.log("error getting reviews by UserId", error);
  }
}

async function updateReview({ review_id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    console.log("ERROR setString was 0 get gud");
    return;
  }

  try {
    const {
      rows: [review],
    } = await client.query(
      `
            UPDATE products
            SET ${setString}
            WHERE review_id=${review_id}
            RETURNING *;
          `,
      Object.values(fields)
    );

    return review;
  } catch (error) {
    console.error("error with updating a review", error);
  }
}

async function deleteReview(review_id) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
        DELETE FROM reviews
        WHERE review_id = $1
        RETURNING *;
        `,
      [review_id]
    );

    return review;
  } catch (error) {
    console.error("error with deleting review", error);
  }
}

module.exports = {
  getReviewsByProductId,
  getReviewsByUserId,
  updateReview,
  addNewReview,
  deleteReview,
};
