export function summaryContent({htmlContent, maxLength = 100}) {
    // Extract text from HTML and trim it to maxLength
    const getTextFromHtml = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    };

    const fullText = getTextFromHtml(htmlContent);
    const summaryText =
        fullText.length > maxLength
            ? `${fullText.substring(0, maxLength)}...`
            : fullText;

    return summaryText;
}

export function summaryText({ text = "", maxLength = 100, ending = "..." }) {
    if (typeof text !== "string") {
        console.error("Invalid input: text should be a string");
        return "";
    }

    const trimmedText = text.trim();
    return trimmedText.length > maxLength
        ? `${trimmedText.substring(0, maxLength)}${ending}`
        : trimmedText;
}
