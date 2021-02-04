import React from "react";

export default function Prompt({ number }) {
    return (
        <>
            {number == 1 && (
                <span>
                    More and more people use computers, but not everyone agrees
                    that this benefits society. Those who support advances in
                    technology believe that computers have a positive effect on
                    people. They teach hand-eye coordination, give people the
                    ability to learn about faraway places and people, and even
                    allow people to talk online with other people. Others have
                    different ideas. Some experts are concerned that people are
                    spending too much time on their computers and less time
                    exercising, enjoying nature, and interacting with family and
                    friends. <br /> <br />
                    Write a letter to your local newspaper in which you state
                    your opinion on the effects computers have on people.
                    Persuade the readers to agree with you.
                </span>
            )}
            {number == 2 && (
                <span>
                    "All of us can think of a book that we hope none of our
                    children or any other children have taken off the shelf. But
                    if I have the right to remove that book from the shelf --
                    that work I abhor -- then you also have exactly the same
                    right and so does everyone else. And then we have no books
                    left on the shelf for any of us." --Katherine Paterson,
                    Author
                    <br />
                    <br />
                    Write a persuasive essay to a newspaper reflecting your vies
                    on censorship in libraries. Do you believe that certain
                    materials, such as books, music, movies, magazines, etc.,
                    should be removed from the shelves if they are found
                    offensive? Support your position with convincing arguments
                    from your own experience, observations, and/or reading.
                </span>
            )}
        </>
    );
}
