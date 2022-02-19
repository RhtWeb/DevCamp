import React from 'react'
import { Link } from 'react-router-dom'

const ManageReviews = () => {
  return (
    <div>
      <section class="container mt-5">
			<div class="row">
				<div class="col-md-8 m-auto">
					<div class="card bg-white py-2 px-4">
						<div class="card-body">
							<h1 class="mb-4">Manage Reviews</h1>
							<table class="table table-striped">
								<thead>
									<tr>
										<th scope="col">Bootcamp</th>
										<th scope="col">Rating</th>
										<th scope="col"></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>DevWorks Bootcamp</td>
										<td>10</td>
										<td>
											<Link to={`editreview`} class="btn btn-secondary"
												><i class="fas fa-pencil-alt"></i>
											</Link>
											<button class="btn btn-danger">
												<i class="fas fa-times"></i>
											</button>
										</td>
									</tr>
									<tr>
										<td>Codemasters</td>
										<td>7</td>
										<td>
											<a href="add-review.html" class="btn btn-secondary"
												><i class="fas fa-pencil-alt"></i
											></a>
											<button class="btn btn-danger">
												<i class="fas fa-times"></i>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</section>
    </div>
  )
}

export default ManageReviews
