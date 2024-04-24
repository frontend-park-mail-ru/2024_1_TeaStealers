// Тег может быть как строкой, так и функцией – если парсим 
// функциональный компонент
type Tag = string | ((props: any, children: any[]) => JSX.Element);

// Атрибуты элемента – объект либо null
type Props = Record<string, string> | null;

// Дети элемента – возвращаемое значение функции h()
type Children = (Node | string)[];

export const h = (tag: Tag, props: Props, ...children: Children) => {
  // Если тег – компонент, вызываем его
  if (typeof tag === 'function') {
    return tag({ ... props }, children);
  }

  // Создаем html-элемент с переданными атрибутами
  const el = document.createElement(tag);
  if (props) {
    Object.entries(props).forEach(([key, val]) => {
      if (key === 'className') {
        el.classList.add(...(val as string || '').trim().split(' '));
        return;
      }

      el.setAttribute(key, val);
    });
  }

  // Добавляем дочерние элементы к родительскому
  children.forEach((child) => {
    el.append(child);
  });

  return el;
};