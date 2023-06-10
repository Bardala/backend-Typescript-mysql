import { Request, Response } from 'express';

const TEAMS = [
    { id: 1, name: 'Real Madrid', league: 'La Liga' },
    { id: 2, name: 'Barcelona', league: 'La Liga' },
    { id: 3, name: 'Manchester United', league: 'Premier League' },
    { id: 4, name: 'Liverpool', league: 'Premier League' },
    { id: 5, name: 'Arsenal', league: 'Premier League' },
    { id: 6, name: 'Inter', league: 'Serie A' },
    { id: 7, name: 'Milan', league: 'Serie A' },
    { id: 8, name: 'Juventus', league: 'Serie A' },
];

export const getTeams = (req: Request, res: Response) => {
    res.send(TEAMS);
};

export const getTeamById = (req: Request, res: Response) => {
    const { id } = req.params;
    const team = TEAMS.find((team) => team.id === parseInt(id));
    res.send(team);
}

export const addTeam = (req: Request, res: Response) => {
    const { name, league } = req.body;
    const newTeam = {
        id: TEAMS.length + 1,
        name,
        league
    };
    TEAMS.push(newTeam);
    res.send(newTeam);
}

export const updateTeamById = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, league } = req.body;
    const team = TEAMS.find((team) => team.id === parseInt(id));
    team.name = name;
    team.league = league;
    res.send(team);
}

export const deleteTeamById = (req: Request, res: Response) => {
    const { id } = req.params;
    const team = TEAMS.find((team) => team.id === parseInt(id));
    const index = TEAMS.indexOf(team);
    TEAMS.splice(index, 1);
    res.send(team);
}