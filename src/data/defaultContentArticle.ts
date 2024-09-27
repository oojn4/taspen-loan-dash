const defaultContentArticle: ClientInputArticle  = {
  article_category_id:"",
  title: "",
  contents: "",
  tags:[],
  cover_image:new File([""], "default-image.jpg", { type: "image/png" })
  
};
export default defaultContentArticle;