import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getReviews } from '../../actions/reviewAction';

const Reviews = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { bootcampId } = useParams();

	useEffect(() => {
		dispatch(getReviews(bootcampId));
	}, [bootcampId]);

	const storedData = useSelector(({ review }) => ({ review }));
	const allReviews = storedData.review.reviews;

  return (
    <div>
      <section className="bootcamp mt-5">
			<div className="container">
				<div className="row">
					{/* <!-- Main col --> */}
					<div className="col-md-8">
						<button className="btn btn-secondary my-3" onClick={() => navigate(-1)}>
							<i className="fas fa-chevron-left"></i> Bootcamp Info</button>
						<h1 className="mb-4">DevWorks Bootcamp Reviews</h1>
						{/* <!-- Reviews --> */}
						{ allReviews.length === 0 && <div className="card mb-3"><h5 className="card-header bg-danger text-white">No Reviews Availiable</h5></div> }
						{ allReviews.map((review) => (
							<div key={review._id} className="card mb-3">
								<h5 className="card-header bg-dark text-white">{review?.title}</h5>
								<div className="card-body">
									<h5 className="card-title">
										Rating: <span className="text-success">{review?.rating}</span>
									</h5>
									<p className="card-text">
										{review?.text}
									</p>
									<p className="text-muted">Writtern By Kevin Smith</p>
								</div>
							</div>
						)) }
						
					</div>
					{/* <!-- Sidebar --> */}
					<div className="col-md-4">
						{/* <!-- Rating --> */}
						<h1 className="text-center my-4">
							<span
								className="badge badge-secondary badge-success rounded-circle p-3"
								>8.8</span
							>
							Rating
						</h1>
						{/* <!-- Buttons --> */}
						<Link to={`/bootcamp/${bootcampId}/addreview`} className="btn btn-primary btn-block my-3">
							<i className="fas fa-pencil-alt"></i> Review This Bootcamp
						</Link>
					</div>
				</div>
			</div>
		</section>
    </div>
  )
}

export default Reviews
