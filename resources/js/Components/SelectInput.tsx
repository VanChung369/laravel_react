import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function SelectInput({
    options,
    selected,
    onChange,
    className,
    defaultValue,
    children,
    ...props
}: any) {
    return (
        <div className={"w-52 " + className}>
            <Listbox
                value={selected}
                onChange={onChange}
                {...props}
                horizontal={false}
            >
                <div className="relative">
                    <Listbox.Button className="relative h-10 w-full cursor-default rounded-lg dark:bg-gray-700 dark:border-gray-700 py-2 pl-3 pr-10 text-left shadow-md dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 sm:text-sm">
                        <span className="block truncate text-gray-300">
                            {selected.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-300"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-56 w-full overflow-auto rounded-md dark:bg-gray-700 dark:border-gray-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {options.map((option: any, i: number) => (
                                <Listbox.Option
                                    key={i}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 max-h-40 overflow-auto rounded-md ${
                                            active
                                                ? "bg-gray-400 text-gray-100"
                                                : "text-gray-300"
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            <option
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                                value={option.value}
                                            >
                                                {option.name}
                                            </option>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
