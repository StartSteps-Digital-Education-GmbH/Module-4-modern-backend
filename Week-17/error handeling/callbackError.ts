const divide = (a: number, b: number , handelError: () => void): number => {
  try {
    return a / b;
  } catch (error) {
    handelError();
    return 0;
  }
}

divide(10, 0, () => {
  console.log('Error happened');
});
