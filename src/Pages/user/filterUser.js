export const filterUsers = (users, keyword) => {
  return users.filter((item) => {
    if (keyword === "") {
      return item;
    } else {
      const nameIncludesKeyword = item.name.toLowerCase().includes(keyword);
      const emailIncludesKeyword = item.email.toLowerCase().includes(keyword);
      const phoneIncludesKeyword = item.phone.toString().includes(keyword);
      const createdAtIncludesKeyword = item.created_at
        .toLowerCase()
        .includes(keyword);
      return (
        nameIncludesKeyword ||
        emailIncludesKeyword ||
        phoneIncludesKeyword ||
        createdAtIncludesKeyword
      );
    }
  });
};
