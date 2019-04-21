import React from 'react';
import Button from '../Button';
import Input from '../Input';
import TextArea from '../TextArea';


export default ({ }) => {
    return <div
        className={"reviews-container"}
    >
        <div
            className={"reviews"}
        >
            <h2>There is no reviews for this product yet.</h2>
            <p>Be the first on provide a review!!</p>
            <br />
            <br />
        </div>
        <div
            className={"review-form"}
        >
            <h3>Choose a nickname</h3>
            <Input
                placeholder={"Choose a nickname"}
            />
            <h3>Your review</h3>
            <TextArea
                placeholder={"Insert your review"}
            />
            <small
                className={"is-gray"}
            >Your review must be at least 50 characters</small>
            <h3>Overall rating</h3>
            <br />
            <Button
                text={"Submit"}
                className={"is-danger is-rounded is-large"}
            />
        </div>
    </div >
}