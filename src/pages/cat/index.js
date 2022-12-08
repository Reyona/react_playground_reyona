import React, {
    useState,
    useMemo,
    useReducer,
    useCallback,
    memo,
    useEffect
} from "react";

function Cat({ name, meow = (f) => f }) {
    console.log("3333333 rendering ", name);

    return <p onClick={() => meow(name)}>{name}</p>;
}
const PureCat = memo(Cat);

export default function CatPage() {
    const [number, setNumber] = useReducer((number, newNumber) => {
        return number + newNumber;
      }, 0);



    const [text, setText] = useState("cat name");
    const [cats, setCats] = useReducer((list, newCat) => [...list, newCat], [
        "Tom",
        "Jame"
    ]);
    const testMeow = useCallback((name) => console.log(name, "is meowing"), []);

    const wordsCount = useMemo(() => {
        console.log("useMemo: text: ", text);
        return text.split(" ").length;
    }, [text]);

    useEffect(() => {
        console.log("useEffect: wordsCount: ", wordsCount);
    }, [wordsCount]);

    console.log("render");
    return (
        <>
            <h1 onClick={() => setNumber(30)}>{number}</h1>

            <input value={ text } onChange={ (e) => setText(e.target.value) } />
            <button onClick={ (e) => setCats(text) }>add cat</button>
            <div>
                {cats.map((name, index) => (
                    <PureCat key={ index } name={ name } meow={ testMeow } />
                ))}
            </div>
        </>
    );
}
