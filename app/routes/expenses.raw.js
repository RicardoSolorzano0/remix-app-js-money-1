const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "first expense",
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: "e2",
    title: "second expense",
    amount: 16.99,
    date: new Date().toISOString(),
  },
];

//if only loader in the file, load the data in the viewport
export function loader() {
  return DUMMY_EXPENSES;
}
