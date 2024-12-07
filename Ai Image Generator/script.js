const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

async function query() {
    image.src = "Loading.gif"
    try {

        console.log("Starting the API request...");
        const response = await fetch(
            "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify({ "inputs": inputTxt.value }),
            }
        );
        console.log("API response received.");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.blob();
        return result;
    } catch (error) {
        console.error("Error fetching the image:", error);
        alert("An error occurred while generating the image. Please check the console for more details.");
    }
}

button.addEventListener('click', async function () {
    query().then((response) => {
        if (response) {
            const objectURL = URL.createObjectURL(response);
            image.src = objectURL;
        }
    });
});

