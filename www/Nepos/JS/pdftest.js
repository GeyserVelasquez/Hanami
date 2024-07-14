const doc = new jsPDF(); // Create a new jsPDF instance
doc.setFont('times', 'normal', 12);
doc.text('Mamalo javier a vaina', 20, 20);
doc.save('MyChatWithNepos.pdf');