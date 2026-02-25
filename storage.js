const username = "onlyyonekai0";
const repo = "cloud-storage";
const token = "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";

async function uploadFile(file) {
    const reader = new FileReader();

    reader.onload = async function () {
        const content = reader.result.split(",")[1];

        const response = await fetch(
            `https://api.github.com/repos/${username}/${repo}/contents/files/${file.name}`,
            {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: "Upload file",
                    content: content
                })
            }
        );

        if (response.ok) {
            alert("File berhasil diupload!");
            listFiles();
        } else {
            alert("Upload gagal!");
        }
    };

    reader.readAsDataURL(file);
}

async function listFiles() {
    const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}/contents/files`,
        {
            headers: {
                Authorization: "Bearer " + token
            }
        }
    );

    const data = await response.json();
    const container = document.getElementById("fileList");
    container.innerHTML = "";

    data.forEach(file => {
        const div = document.createElement("div");
        div.innerHTML = `
            ${file.name}
            <a href="${file.download_url}" target="_blank">Download</a>
        `;
        container.appendChild(div);
    });
}
