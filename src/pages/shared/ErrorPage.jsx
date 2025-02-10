import React from 'react'
import { Button } from 'react-bootstrap';
import { Link, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const { error } = useRouteError();
    console.log(error);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {error?.statusText ||
            error?.message ||
            "An unexpected error occurred"}
        </i>
        <br />
        Go back to <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default ErrorPage