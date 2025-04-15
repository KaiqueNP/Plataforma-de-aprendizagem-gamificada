
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const questions = [
  {
    question: "Qual é a capital da França?",
    options: ["Paris", "Berlim", "Madrid", "Lisboa"],
    answer: "Paris",
  },
  {
    question: "Quem escreveu 'Dom Casmurro'?",
    options: ["Machado de Assis", "José de Alencar", "Carlos Drummond", "Clarice Lispector"],
    answer: "Machado de Assis",
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    options: ["Terra", "Júpiter", "Saturno", "Marte"],
    answer: "Júpiter",
  },
];

export default function GamifiedLearning() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [level, setLevel] = useState(1);

  const handleAnswer = (option: string) => {
    if (option === questions[index].answer) setScore(score + 1);
    const nextIndex = index + 1;
    if (nextIndex < questions.length) {
      setIndex(nextIndex);
      if ((nextIndex + 1) % 3 === 0) setLevel(level + 1);
    } else {
      setCompleted(true);
    }
  };

  const progress = ((index + (completed ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-6">
      <Card className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-6">
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <Badge variant="outline">Nível {level}</Badge>
            <Progress value={progress} className="w-2/3 h-2 bg-gray-200" />
          </div>
          {!completed ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {questions[index].question}
              </h2>
              <div className="grid gap-2">
                {questions[index].options.map((opt) => (
                  <Button
                    key={opt}
                    className="w-full"
                    variant="secondary"
                    onClick={() => handleAnswer(opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-green-600">Parabéns!</h2>
              <p className="text-lg mt-2">Você acertou {score} de {questions.length} perguntas.</p>
              <p className="text-sm text-gray-500">Continue praticando para subir de nível!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
