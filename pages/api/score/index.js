export default function handler(req, res) {
    if (req.method === "POST") {
        const text = req.body["text"];

        fetch(`http://localhost:5000/score`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ text: text }),
        })
            .then((res) => res.json())
            .then((data) =>
                res.status(200).json({
                    status: "success",
                    text: data.text,
                    score: data.score,
                })
            )
            .catch((err) =>
                res.status(404).json({
                    status: "error",
                    error: err,
                })
            );
    }
}
