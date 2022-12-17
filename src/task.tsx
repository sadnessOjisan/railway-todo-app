import { ComponentType, useEffect, useState } from "react";

interface Props {
  listId: string;
}

interface List {
  id: string;
  title: string;
  tasks: ReadonlyArray<{
    id: string;
    title: string;
    detail: string;
    done: boolean;
    limit: string;
  }>;
}

export const TaskList: ComponentType<Props> = ({ listId }) => {
  const [list, setListLitem] = useState<List | undefined>(undefined);
  useEffect(() => {
    fetch(
      `https://qvg1o8w2ef.execute-api.ap-northeast-1.amazonaws.com/lists/${listId}/tasks`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data: List) => {
        setListLitem(data);
      });
  }, [listId]);
  return (
    <div>
      {list?.tasks.map((t) => (
        <div key={t.id}>{t.detail}</div>
      ))}
    </div>
  );
};
