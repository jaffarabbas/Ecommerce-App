using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAppServices.Models;

[Table("TEMP_USER_ORDERS")]
[Index("UserToken", Name = "UQ__TEMP_USE__07CCCF36976024E0", IsUnique = true)]
public partial class TempUserOrder
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("user_token")]
    [StringLength(255)]
    [Unicode(false)]
    public string UserToken { get; set; } = null!;

    [Column("name")]
    [StringLength(100)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [Column("email")]
    [StringLength(233)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("phone")]
    [StringLength(100)]
    [Unicode(false)]
    public string Phone { get; set; } = null!;

    [Column("address")]
    [StringLength(250)]
    [Unicode(false)]
    public string Address { get; set; } = null!;

    [Column("pid")]
    public int Pid { get; set; }

    [Column("quantity")]
    public int Quantity { get; set; }

    [Column("total_price", TypeName = "decimal(10, 2)")]
    public decimal TotalPrice { get; set; }

    [Required]
    [Column("tm_status")]
    public bool? TmStatus { get; set; }

    [Column("orderat", TypeName = "datetime")]
    public DateTime Orderat { get; set; }

    [ForeignKey("Pid")]
    [InverseProperty("TempUserOrders")]
    public virtual Product PidNavigation { get; set; } = null!;
}
