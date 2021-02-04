export default (req, res) => {
    const {
        query: { id },
    } = req;

    fetch(`http://localhost:5000/score/${id}`)
        .then((res) => res.json())
        .then((data) =>
            res.status(200).json({
                result: "success",
                text: data.text,
                score: data.score,
            })
        )
        .catch((err) => {
            res.status(404).json({
                result: "error",
            });
        });
};
