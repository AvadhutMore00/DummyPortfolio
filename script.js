
    document.addEventListener('DOMContentLoaded', () => {
    const typingTextElement = document.getElementById('typing-text');
    // Get the lines of code from the data-lines attribute
    const lines = JSON.parse(typingTextElement.getAttribute('data-lines'));
    let lineIndex = 0;
    let charIndex = 0;

function highlightSyntax(text) {
    // 1. Regex for string values (text inside double quotes)
    // Uses $& to replace the WHOLE MATCHED STRING with the wrapped <span>
    // text = text.replace(/('')/g, '<span class=" ">$&</span>');
    
    // 2. Regex for JS keywords (const, var, let)
    // Uses $& to replace the WHOLE MATCHED STRING with the wrapped <span>
    // text = text.replace(/(\b('')\b)/g, '<span class=" ">$1</span>');
    
    // 3. Regex for object properties (before a colon)
    // Uses $& to replace the WHOLE MATCHED STRING (property name and colon) with the wrapped <span>
    // text = text.replace(/(\b('')\b\s*:)/g, '<span class="prob">$1</span>');

    // 4. Regex for operators and symbols (brackets, comma, colon, semicolon, equals sign)
    // Uses $& to replace the WHOLE MATCHED STRING with the wrapped <span>
    // text = text.replace(/([\[\]\{\}:;,=])/g, '<span class="">$1</span>');

    return text;
}
    function typeLine() {
        if (lineIndex < lines.length) {
            const currentLine = lines[lineIndex];
            
            // Clean the line and add a final cursor
            const textToDisplay = highlightSyntax(currentLine.substring(0, charIndex)) + '<span class=""></span>';
            
            // Append the line to the pre element
            // We use innerHTML directly to allow for the span tags from highlighting
            if (charIndex === 0) {
                 typingTextElement.innerHTML += '<div id="line-' + lineIndex + '"' + textToDisplay + '</div>';
            } else {
                 // Update the current line element
                 document.getElementById('line-' + lineIndex).innerHTML = textToDisplay;
            }

            charIndex++;

            if (charIndex > currentLine.length) {
                // Remove the cursor from the finished line
                document.getElementById('line-' + lineIndex).innerHTML = highlightSyntax(currentLine);

                // Move to the next line
                lineIndex++;
                charIndex = 0;
                
                // Add a slight pause before starting the next line
                setTimeout(typeLine, 500); 
            } else {
                // Continue typing the current line
                setTimeout(typeLine, 50); // Typing speed (milliseconds per character)
            }
        } else {
            // Animation finished: remove the final cursor
            const lastLineElement = document.getElementById('line-' + (lines.length - 1));
            if (lastLineElement) {
                lastLineElement.innerHTML = highlightSyntax(lines[lines.length - 1]);
            }
        }
    }

    // Start the typing animation
    typeLine();
});









