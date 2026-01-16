function useTool() {
    const LIMIT = 5;
    let used = Number(localStorage.getItem('daily_used') || 0);


    if (used >= LIMIT) {
        alert('Daily free limit reached. Pro coming soon!');
        return;
    }


    localStorage.setItem('daily_used', used + 1);
    alert('Tool executed successfully!');
}