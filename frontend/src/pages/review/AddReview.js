import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddReview = () => {
	const navigate = useNavigate();
  return (
    <div>
      <section class="container mt-5">
			<div class="row">
				<div class="col-md-8 m-auto">
					<div class="card bg-white py-2 px-4">
						<div class="card-body">
							<button class="btn btn-link text-secondary my-3" onClick={() => navigate(-1)}>
								<i class="fas fa-chevron-left"></i> Bootcamp Info
							</button>
							<h1 class="mb-2">DevWorks Bootcamp</h1>
							<h3 class="text-primary mb-4">Write a Review</h3>
							<p>
								You must have attended and graduated this bootcamp to review
							</p>
							<form action="reviews.html">
								<div class="form-group">
									<label for="rating"
										>Rating: <span class="text-primary">8</span></label
									>
									<input
										type="range"
										class="custom-range"
										min="1"
										max="10"
										step="1"
										value="8"
										id="rating"
									/>
								</div>
								<div class="form-group">
									<input
										type="text"
										name="title"
										class="form-control"
										placeholder="Review title"
									/>
								</div>
								<div class="form-group">
									<textarea
										name="review"
										rows="10"
										class="form-control"
										placeholder="Your review"
									></textarea>
								</div>
								<div class="form-group">
									<input
										type="submit"
										value="Submit Review"
										class="btn btn-dark btn-block"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
    </div>
  )
}

export default AddReview
