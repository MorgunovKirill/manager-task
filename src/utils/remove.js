export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
