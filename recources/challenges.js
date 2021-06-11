const challenges = [
    {
        completed: false,
        playable: true,
        url: null,
        id: null,
        solution: "$.get(\"/challenge\")"
    },
    {
        completed: false,
        playable: false,
        url: false,
        id: null,
        solution: "$.get(\"/challenge/coffee\")"
    },
    {
        completed: false,
        playable: false,
        url: null,
        id: null,
        solution: "$.post(\"/challenge/mates\")"
    },
    {
        completed: false,
        playable: false,
        url: null,
        id: null,
        solution: "$.ajax(\"/challenge/away\",{method: \"PUT\"})"
    },
    {
        completed: false,
        playable: false,
        url: null,
        id: null,
        solution: "$.ajax(\"/challenge/that\",{method: \"DELETE\"})"
    },
    {
        completed: false,
        playable: false,
        url: null,
        id: null,
        solution: "$.post(\"/challenge/board\", \"hello\")"
    },
    {
        completed: false,
        playable: false,
        url: null,
        id: null,
        solution: "$.get(\"/challenge/icecream\", {want: true})"
    },
    {
        completed: false,
        playable: false,
        url: null,
        id: null,
        solution: "$.get(\"/challenge/fefifofum\", function(data){$.post(\"/challenge/jack\", data)})"
    },
    {
        completed: false,
        playable: false,
        url: null,
        id: null,
        solution: "$.get(\"/challenge/alice\", function (data){$.ajax(`/challenge/${data.foe}`, {method: \"DELETE\", data: {weapon: \"Vorpal Sword\"}})})"
    },
    {
        completed: false,
        playable: false,
        url: null,
        id: null,
        solution: ""
    },
    {
        completed: false,
        playable: false,
        url: null,
        id: null,
        solution: ""
    },
]

module.exports = challenges;
