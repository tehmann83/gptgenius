'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { generateChatBotResponse } from '@/utils/actions';
import { personalities } from '@/utils/personalities';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const Chat = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedDesc, setSelectedDesc] = useState(null);

  const { mutate, isPending, data } = useMutation({
    // mutationFn: (query) => generateChatResponse([...messages, query]),
    mutationFn: (query) =>
      generateChatBotResponse([...messages, query], selected, selectedDesc),

    onSuccess: (data) => {
      if (!data) {
        toast.error('Something went wrong...');
        return;
      }
      setMessages((prev) => [...prev, data]);
    },
    onError: (error) => {
      toast.error('Something went wrong...');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: 'user', content: text };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText('');
  };

  const handleSelection = (title, description) => {
    setSelected(title);
    setSelectedDesc(description);
  };

  useEffect(() => {
    if (selected) {
      console.log({ selected });
    }
  }, [selected]);

  return (
    <div className="flex flex-col ">
      <div className="flex-none p-4">
        {/* personalities */}
        <div className="flex flex-col space-y-4 ">
          <div className="flex flex-row">
            {personalities.map((p, idx) => {
              return (
                <div key={p.title}>
                  <div>
                    <Image
                      src={`/images/personalities/${idx + 1}.png`}
                      alt={p.title}
                      width={150}
                      height={150}
                      className={`cursor-pointer p-2 rounded-full hover:scale-110  ${
                        selected === p.title
                          ? 'border border-amber-700 scale-110'
                          : null
                      }`}
                      title={`${p.title} - ${p.description}`}
                      onClick={() => handleSelection(p.title, p.description)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            {!selected ? null : (
              <div>
                <p>
                  {selected} - {selectedDesc}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* messages */}
      <div className="flex-auto overflow-y-auto  p-4 max-h-[calc(100vh-18rem)]">
        <div className="space-y-4">
          {messages.map(({ role, content }, index) => {
            const avatar = role == 'user' ? '👤' : '🤖';
            const bcg = role == 'user' ? 'bg-base-200' : 'bg-base-100';
            return (
              <div
                key={index}
                className={` ${bcg} flex py-6 -mx-1 px-8 text-xl leading-loose border-b border-[#dc944c]`}
              >
                <span className="mr-4">{avatar}</span>
                <p className="max-w-3xl">{content}</p>
              </div>
            );
          })}
          {isPending && <span className="loading"></span>}
        </div>
      </div>
      <div className="flex-none p-4">
        {/* input */}
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl pt-12 fixed bottom-0 w-full "
        >
          <div className="join w-full">
            <input
              type="text"
              placeholder="Message GeniusGPT"
              className="input input-bordered join-item w-full"
              value={text}
              required
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="btn btn-primary join-item"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'please wait' : 'ask question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Chat;
