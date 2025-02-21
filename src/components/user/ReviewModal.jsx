import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

function ReviewModal({ show, handleClose, turfId, oldReview}) {

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [review, setReview] = useState();
    const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    if (oldReview !== null && oldReview !== undefined) {
      console.log("Old review Id=== ", oldReview);
      setReview(oldReview)
      setRating(oldReview.rating || 5);
      setComment(oldReview.comment || "");
      setFirstTime(false);
    }
  }, [oldReview]);

    
    const handleSubmit = async () => {
        try {
            console.log("old", oldReview?._id)
            console.log("turf",turfId)
            if (!rating) {
                toast.error("Please provide a rating value");
                return;
            }

            if (firstTime) {
                const response = await axiosInstance({
                    method: "POST",
                    url: "/review/new-review",
                    data: {
                        turfId,
                        rating,
                        comment
                    }
                })
                console.log("First Time")
                toast.success("Review submitted successfully!");
            }
            else {
                const response = await axiosInstance({
                    method: "PUT",
                    url: "/review/update-review",
                    data: {
                        reviewId: oldReview?._id,
                        turfId:oldReview?.turfId,
                        rating,
                        comment
                    }
                })
                console.log("Updating")
                toast.success("Review updated successfully!");
            }
            handleClose();
        } catch (error) {
            toast.error("Error.... try again...")
            console.error("Error submitting review", error);
        }
    };
    

  return (
      <>
          <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Write a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Rating (1-5)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment || review?.comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Submit Review
        </Button>
      </Modal.Footer>
    </Modal>
      </>
  )
}

export default ReviewModal