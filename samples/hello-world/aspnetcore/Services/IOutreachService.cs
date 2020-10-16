using System.Threading.Tasks;
using Outreach.CXT.Demo.Server.Models;

namespace Outreach.CXT.Demo.Server.Services
{
    public interface IOutreachService
    {
        Task<TokenInfo> GetTokenAsync(string code);

        Task<TokenInfo> RefreshTokenAsync(string refreshToken);
    }
}
