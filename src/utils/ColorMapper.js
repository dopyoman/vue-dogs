export function colorMap(index) {
    const colorMap = {
        0: "#845ec2",
        1: "#f3c5ff",
        2: "#00c9a7",
        3: "#fefedf",
        4: "#4e8397",
        5: "#ff8066"
    };

    return colorMap[index % 6];
}
