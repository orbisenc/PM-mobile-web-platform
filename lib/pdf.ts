export function downloadDemoPdf(receiptNumber: string, submittedAt: string, decision: string) {
  const lines = [
    "DEMO CONSENT RECEIPT",
    `Receipt: ${receiptNumber}`,
    `Submitted: ${submittedAt}`,
    `Decision: ${decision === "agree" ? "AGREE" : "DISAGREE"}`,
    "This sample has no legal effect.",
  ];
  const stream = lines.map((line, i) => `BT /F1 ${i === 0 ? 18 : 11} Tf 50 ${760 - i * 32} Td (${line.replace(/[()\\]/g, "")}) Tj ET`).join("\n");
  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >> endobj",
    `4 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`,
    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj) => { offsets.push(pdf.length); pdf += `${obj}\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => { pdf += `${String(offset).padStart(10, "0")} 00000 n \n`; });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `DEMO-confirmation-${receiptNumber}.pdf`;
  anchor.click();
  URL.revokeObjectURL(url);
}
