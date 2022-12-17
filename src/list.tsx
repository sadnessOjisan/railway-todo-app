import { useEffect, useState } from "react";
import { TaskList } from "./task";

interface List {
  id: string;
  title: string;
}

export const List = () => {
  const [list, setList] = useState<ReadonlyArray<List>>([]);
  const [cursor, setCursor] = useState(0);
  const [selectedListId, setSelectedListId] = useState<undefined | string>(
    undefined
  );

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      console.log(cursor);
      if (cursor > 0) {
        setCursor(cursor - 1);
      }
    } else if (e.key === "ArrowRight") {
      if (cursor < list.length - 1) {
        const nextCount = cursor + 1;
        setCursor(nextCount);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKey, false);
    return () => document.removeEventListener("keydown", handleKey, false);
  }, [list, cursor]);

  useEffect(() => {
    if (list.length === 0) return;
    setSelectedListId(list[cursor].id);
  }, [cursor]);

  const onListItemClick = (id: string) => {
    setSelectedListId(id);
  };

  useEffect(() => {
    fetch("https://qvg1o8w2ef.execute-api.ap-northeast-1.amazonaws.com/lists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data: ReadonlyArray<List>) => {
        setList(data);
      });
  }, []);
  return (
    <div>
      list.length - 1{list.length - 1} /// cursor{cursor}
      <div style={{ display: "flex" }}>
        {list.map((l) => (
          <div
            key={l.id}
            style={{ margin: 8 }}
            onClick={() => onListItemClick(l.id)}
          >
            {l.title}
          </div>
        ))}
      </div>
      <div>{selectedListId && <TaskList listId={selectedListId} />}</div>
    </div>
  );
};
