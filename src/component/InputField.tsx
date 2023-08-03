import {useRef} from 'react'
import './style.css'

interface Props {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>
    addTodo:(e:React.FormEvent)=> void
}

const InputField = ({ todo, setTodo, addTodo }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)


    return ( 
        <div>
            <form
                className="input"
                onSubmit={(e) => {
                    addTodo(e)
                    inputRef.current?.blur()
                }
                }
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter a task" className="input__box"
                    value={todo}
                    onChange={(e) => {
                        setTodo(e.target.value)
                    }}
                />
                <button className="input_submit" type="submit">Add</button>
            </form>
        </div>
     );
}
 
export default InputField;