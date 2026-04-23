import React, { useState } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

const Leaders = () => {
  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, name: "Mary N.", score: 980 },
    { rank: 2, name: "Emeka O.", score: 935 },
    { rank: 3, name: "Grace A.", score: 910 },
    { rank: 4, name: "Samuel T.", score: 885 },
    { rank: 5, name: "Jennifer K.", score: 860 }
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editScore, setEditScore] = useState("");

  const addLeader = () => {
    const newLeader = {
      rank: leaderboardData.length + 1,
      name: "New Leader",
      score: 0
    };
    const updatedData = [...leaderboardData, newLeader].sort((a, b) => b.score - a.score);
    updatedData.forEach((leader, index) => leader.rank = index + 1);
    setLeaderboardData(updatedData);
  };

  const deleteLeader = (index) => {
    const updatedData = leaderboardData.filter((_, i) => i !== index).sort((a, b) => b.score - a.score);
    updatedData.forEach((leader, idx) => leader.rank = idx + 1);
    setLeaderboardData(updatedData);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditName(leaderboardData[index].name);
    setEditScore(leaderboardData[index].score.toString());
  };

  const saveEdit = () => {
    const updatedData = [...leaderboardData];
    updatedData[editingIndex] = {
      ...updatedData[editingIndex],
      name: editName,
      score: parseInt(editScore) || 0
    };
    const sortedData = updatedData.sort((a, b) => b.score - a.score);
    sortedData.forEach((leader, idx) => leader.rank = idx + 1);
    setLeaderboardData(sortedData);
    setEditingIndex(null);
    setEditName("");
    setEditScore("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditName("");
    setEditScore("");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Leaderboard</h1>
          <p className="mt-2 text-sm text-slate-500">Top performers in event attendance, service hours, and community impact.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addLeader}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            Add Leader
          </button>
          <div className="rounded-full bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700">Updated daily</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.15em]">Rank</th>
              <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.15em]">Name</th>
              <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.15em]">Score</th>
              <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.15em]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {leaderboardData.map((row, index) => (
              <tr key={index} className="transition hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-900">#{row.rank}</td>
                <td className="px-6 py-4 text-slate-700">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full rounded border px-2 py-1"
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td className="px-6 py-4 text-slate-900">
                  {editingIndex === index ? (
                    <input
                      type="number"
                      value={editScore}
                      onChange={(e) => setEditScore(e.target.value)}
                      className="w-full rounded border px-2 py-1"
                    />
                  ) : (
                    row.score
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingIndex === index ? (
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="rounded bg-green-600 p-1 text-white hover:bg-green-700"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="rounded bg-gray-600 p-1 text-white hover:bg-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(index)}
                        className="rounded bg-blue-600 p-1 text-white hover:bg-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteLeader(index)}
                        className="rounded bg-red-600 p-1 text-white hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaders;
